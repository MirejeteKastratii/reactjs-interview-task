import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

interface P {
  setSearch: (searchValue: string) => void;
}

export const Search = ({ setSearch }: P) => {
  return (
    <Input
      prefix={<SearchOutlined />}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
    />
  );
};
