import { useState } from "react";
import { Button } from "../../Button";
import { NewCategory } from "../NewCategory/NewCategory";

export const CategoryMenu = () => {
  const [create, setCreate] = useState(false);
  return (
    <div>
      <Button
        actionType="create"
        buttonName="Create category"
        onClick={() => {
          setCreate(true);
        }}
      />
      {create && <NewCategory onClick={() => {}} />}
    </div>
  );
};
