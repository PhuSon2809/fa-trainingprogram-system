import {
    CopyIcon,
    DeleteIcon,
    EditIcon,
  } from "~/components/Icons";
  
  export const PoperMenuData = [
    {
      title: "Edit Class",
      icon: <EditIcon />,
      onClick: (data) => {
        return data.id;
      }    
    },
    {
      title: "Duplicate class",
      icon: <CopyIcon />,
      onClick: (data) => {
        return data.id;
      }
    },
    {
      title: "Delete class",
      icon: <DeleteIcon />,
    },
  ];
