package common

type successRes struct {
	Data    interface{} `json:"data"`
	Paging  interface{} `json:"paging,omitempty"`
	Filters interface{} `json:"filters,omitempty"`
}

func NewSuccessResponse(data, paging, filters interface{}) *successRes {
	return &successRes{
		Data:    data,
		Paging:  paging,
		Filters: filters,
	}
}

func SimpleSuccessResponse(data interface{}) *successRes {
	return NewSuccessResponse(data, nil, nil)
}
