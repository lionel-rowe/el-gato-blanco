interface ISuccessFetchResponse<T> {
  data: T;
  res: object;
}

type FetchResponse<T> = ISuccessFetchResponse<T>;

interface IToast {
  message: string;
  icon: Icon | "";
}

interface IIconProps {
  glyph: string;
  class: string;
}

type Icon = "success" | "error" | "warning" | "info";

type IconMap = { [key in Icon]: IIconProps };
