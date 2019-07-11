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
  color: string;
}

type Icon = "success";

type IconMap = { [key in Icon]: IIconProps };
