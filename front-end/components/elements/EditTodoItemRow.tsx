"use client";

import * as zod from "zod";
import React, { FC } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./EditTodoItemRow.module.css"; // Import CSS module

const TodoItemSchema = zod.object({
  todoItem: zod.string().min(1, { message: "Please enter." }),
  isTodoFinish: zod.boolean(),
});

type TodoItem = zod.infer<typeof TodoItemSchema> & { id?: number };

export const EditTodoItemRow: FC<{
  item: TodoItem;
  onCompleted: (isUpdated: boolean) => void;
  apiURL: string;
}> = ({ item, onCompleted, apiURL }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(TodoItemSchema),
    defaultValues: item,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const onSubmit = async (data: TodoItem) => {
    if (item.id) {
      await axios.put(`${apiURL}${item.id}`, data);
    } else {
      await axios.post(apiURL, data);
    }
    onCompleted(true);
  };

  return (
    <tr className={styles.editRow} onSubmit={handleSubmit(onSubmit)}>
      <td style={{ width: "80px" }}>{item.id}</td>

      <td>
        <input className={styles.input} {...register("todoItem")} />
        {errors.todoItem?.message && (
          <p className={styles.errorMessage}>{errors.todoItem?.message}</p>
        )}
      </td>
      <td style={{ width: "80px" }}></td>
      <td
        style={{
          width: "200px",
          verticalAlign: "top",
          textAlign: "center",
        }}
      >
        <button
          className={styles.cancelButton}
          type="button"
          onClick={() => {
            reset();
            onCompleted(false);
          }}
        >
          Cancel
        </button>
        <button
          className={styles.saveButton}
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
        >
          Submit
        </button>
      </td>
    </tr>
  );
};
