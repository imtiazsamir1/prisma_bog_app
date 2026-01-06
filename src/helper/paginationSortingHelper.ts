import { Prisma } from "../../generated/prisma/client";


type IOptions = {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: string;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: Prisma.SortOrder;
};

const paginationSortingHelper = (
  options: IOptions
): IOptionsResult => {
  const page = Number(options.page) > 0 ? Number(options.page) : 1;
  const limit = Number(options.limit) > 0 ? Number(options.limit) : 10;
  const skip = (page - 1) * limit;

  const sortBy =
    typeof options.sortBy === "string"
      ? options.sortBy
      : "createdAt";

  const sortOrder: Prisma.SortOrder =
    options.sortOrder === "asc" ? "asc" : "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export default paginationSortingHelper;
