import React from "react";
import { Avatar, Autocomplete, Box, TextField, Tooltip } from "@mui/material";
import type { CellProps } from "../../types/cells";
import type { UserBase } from "../../../auth/types/user";
import type { AutocompleteGetTagProps } from "@mui/material";

type AssigneeCellProps = Omit<CellProps, "value" | "onChange"> & {
  value?: UserBase[];
  allUsers: UserBase[];
};

function AssigneeCell({
  value = [],
  allUsers,
  editing,
  onBlur,
}: AssigneeCellProps) {
  const renderTags = (
    tagValue: UserBase[],
    getTagProps: AutocompleteGetTagProps
  ) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        gap: 0.5,
        cursor: "pointer",
      }}
    >
      {tagValue.map((option, index) => {
        const { key, ...tagProps } = getTagProps({ index });
        return (
          <Box
            key={option.id}
            position="relative"
            sx={{
              "&:hover .delete-icon": { opacity: 1 },
              display: "inline-block",
            }}
          >
            <Tooltip title={option.name}>
              <Avatar
                key={key}
                {...tagProps}
                src={option.avatarUrl}
                sx={{
                  width: 28,
                  height: 28,
                  fontSize: 13,
                  bgcolor: "primary.light",
                  transition: "transform 0.15s ease-in-out",
                  "&:hover": { transform: "scale(1.08)" },
                }}
              >
                {option.name[0]}
              </Avatar>
            </Tooltip>
          </Box>
        );
      })}
    </Box>
  );

  const renderAutocomplete = (selected: UserBase[]) => (
    <Autocomplete
      multiple
      disableCloseOnSelect
      options={allUsers}
      getOptionLabel={(option) => option.name}
      value={selected}
      renderTags={(tagValue, getTagProps) =>
        tagValue.length > 0 ? renderTags(tagValue, getTagProps) : null
      }
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          onBlur={onBlur}
          placeholder=""
          sx={{
            "& .MuiInputBase-root": {
              borderBottom: "none !important",
              "&::before, &::after": { display: "none !important" },
            },
            "& .MuiInputBase-input": {
              padding: 0,
              width: 0,
              minWidth: 0,
              caretColor: "transparent",
              color: "transparent",
            },
            "& fieldset": { border: "none", outline: "none" },
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Avatar src={option.avatarUrl} sx={{ width: 24, height: 24, mr: 1 }}>
            {option.name[0]}
          </Avatar>
          {option.name}
        </li>
      )}
      sx={{
        "& .MuiInputBase-root": {
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
          gap: 0.5,
          border: "none !important",
        },
        "& .MuiAutocomplete-endAdornment": { display: "none" },
      }}
    />
  );

  if (editing) {
    return renderAutocomplete(value);
  }

  if (!value?.length) return <span>—</span>;

  return (
    <Box sx={{ display: "flex" }}>
      {value.map((user, index) => (
        <Tooltip key={user.id} title={user.name}>
          <Avatar
            src={user.avatarUrl}
            sx={{
              width: 32,
              height: 32,
              fontSize: 14,
              border: "1px solid white",
              mr: index !== value.length - 1 ? -1.2 : 0,
              transition: "transform 0.15s ease-in-out",
              "&:hover": { transform: "scale(1.08)", zIndex: 10 },
            }}
          >
            {user.name[0]}
          </Avatar>
        </Tooltip>
      ))}
    </Box>
  );
}

export default React.memo(AssigneeCell);
