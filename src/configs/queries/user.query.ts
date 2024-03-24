import { ApiQueryOptions } from "@nestjs/swagger";

const QUERY_PAGE: ApiQueryOptions = {
  name: 'page',
  type: 'number',
  description: 'Bản ghi bắt đầu lấy'
}

const QUERY_PAGE_SIZE: ApiQueryOptions = {
  name: 'pageSize',
  type: 'number',
  description: 'Bản ghi bắt đầu lấy'
}
