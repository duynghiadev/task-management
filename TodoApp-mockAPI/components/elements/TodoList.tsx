"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import * as zod from "zod";
import styles from "./TodoList.module.css";
import { EditTodoItemRow } from "./EditTodoItemRow";

const TodoItemSchema = zod.object({
  todoItem: zod.string().min(1, { message: "Please enter." }),
  isTodoFinish: zod.boolean(),
});

// const apiURL = "http://localhost:3000/v1/items";
const apiURL = "http://localhost:3001/todo/";

type TodoItem = zod.infer<typeof TodoItemSchema> & { id?: number };

export const TodoList = () => {
  const [todoItems, setTodoItems] = useState<TodoItem[]>();
  const [editItemId, setEditItemId] = useState<TodoItem["id"] | "newItem">();

  const fetchTodoItems = async () => {
    const { data } = await axios.get(apiURL);
    setTodoItems(data);
  };

  useEffect(() => {
    fetchTodoItems();
  }, []);

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th className={styles.th} style={{ minWidth: "150px" }}>
            No.
          </th>
          <th className={styles.th} style={{ minWidth: "250px" }}>
            Tasks
          </th>
          <th className={styles.th} style={{ minWidth: "150px" }}>
            Complete
          </th>
          <th className={styles.th} style={{ minWidth: "150px" }}></th>
        </tr>

        {todoItems?.map((item) =>
          editItemId === item.id ? (
            <EditTodoItemRow
              key={item.id}
              item={item}
              onCompleted={async (isUpdated) => {
                if (isUpdated) {
                  await fetchTodoItems();
                }
                setEditItemId(undefined);
              }}
              apiURL={apiURL}
            />
          ) : (
            <tr key={item.id}>
              <td className={styles.td} style={{ minWidth: "150px" }}>
                {item.id}
              </td>
              <td className={styles.td} style={{ minWidth: "250px" }}>
                {item.isTodoFinish ? (
                  <span
                    style={{ textDecoration: "line-through", color: "red" }}
                  >
                    {item.todoItem}
                  </span>
                ) : (
                  item.todoItem
                )}
              </td>
              <td className={styles.td} style={{ minWidth: "150px" }}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  checked={item.isTodoFinish}
                  onChange={async (e) => {
                    item.isTodoFinish = e.target.checked;
                    await axios.put(`${apiURL}${item.id}`, item);
                    await fetchTodoItems();
                  }}
                />
              </td>
              <td className={styles.actions} style={{ minWidth: "150px" }}>
                <button
                  className={styles.buttonDelete}
                  type="submit"
                  disabled={editItemId !== undefined}
                  onClick={async () => {
                    if (confirm(`Do you want to delete '${item.todoItem}'?`)) {
                      await axios.delete(`${apiURL}${item.id}`);
                      await fetchTodoItems();
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  className={styles.buttonChange}
                  type="button"
                  disabled={editItemId !== undefined}
                  onClick={() => setEditItemId(item.id)}
                >
                  Change
                </button>
              </td>
            </tr>
          )
        )}
        {editItemId === "newItem" && (
          <EditTodoItemRow
            item={{ todoItem: "", isTodoFinish: false }}
            onCompleted={async (isUpdated) => {
              if (isUpdated) {
                await fetchTodoItems();
              }
              setEditItemId(undefined);
            }}
            apiURL={apiURL}
          />
        )}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button
              className={styles.addButton}
              type="button"
              disabled={editItemId !== undefined}
              onClick={() => setEditItemId("newItem")}
            >
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
