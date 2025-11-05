import React from "react";
import type { CellProps } from "./CellProps";
import {
  Avatar,
  Autocomplete,
  Box,
  TextField,
  Tooltip,
  IconButton,
} from "@mui/material";
import { FaTimes } from "react-icons/fa";
import type { UserBase } from "../../../../types/user";

type AssigneeCellProps = Omit<CellProps, "value" | "onChange"> & {
  value?: UserBase[];
  allUsers: UserBase[];
  onChange?: (newUsers: UserBase[]) => void;
};

function AssigneeCell({
  value = [],
  allUsers,
  onChange,
  editing,
  onBlur,
}: AssigneeCellProps) {
  const handleDelete = (userId: string) => {
    const newValue = value.filter((user) => user.id !== userId);
    onChange?.(newValue);
  };

  if (!value || value.length === 0) {
    return editing ? (
      <Autocomplete
        multiple
        options={allUsers}
        getOptionLabel={(option) => option.name}
        value={[]}
        onChange={(_, newValue) => onChange?.(newValue)}
        renderTags={() => null}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            sx={{
              "& .MuiInputBase-input": {
                padding: 0,
                width: 0,
                minWidth: 0,
                caretColor: "transparent",
                color: "transparent",
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <Avatar
              src={option.avatarUrl}
              sx={{ width: 24, height: 24, mr: 1 }}
            >
              {option.name[0]}
            </Avatar>
            {option.name}
          </li>
        )}
        sx={{
          "& .MuiInputBase-root": { border: "none" },
          "& .MuiAutocomplete-endAdornment": { display: "none" },
        }}
      />
    ) : (
      <span>—</span>
    );
  }

  if (editing) {
    return (
      <Autocomplete
        multiple
        disableCloseOnSelect
        options={allUsers}
        getOptionLabel={(option) => option.name}
        value={value}
        onChange={(_, newValue) => onChange?.(newValue)}
        renderTags={(tagValue, getTagProps) => (
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

                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(option.id);
                    }}
                    className="delete-icon"
                    sx={{
                      position: "absolute",
                      top: -4,
                      right: -4,
                      width: 16,
                      height: 16,
                      boxShadow: 1,
                      opacity: 0,
                      transition: "opacity 0.2s ease-in-out",
                      "& svg": { width: 10, height: 10 },
                    }}
                  >
                    <FaTimes size={8} color="black" />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder=""
            onBlur={onBlur}
            sx={{
              "& .MuiInputBase-input": {
                padding: 0,
                width: 0,
                minWidth: 0,
                caretColor: "transparent",
                color: "transparent",
              },
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <Avatar
              src={option.avatarUrl}
              sx={{ width: 24, height: 24, mr: 1 }}
            >
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
            border: "none",
            "&:before, &:after": { display: "none" },
          },
          "& .MuiAutocomplete-endAdornment": { display: "none" },
        }}
      />
    );
  }

  // 🔵 Chế độ xem (view mode)
  return (
    <Box sx={{ display: "flex", gap: 0.75 }}>
      {value.map((user) => (
        <Tooltip key={user.id} title={user.name}>
          <Avatar
            src={user.avatarUrl}
            sx={{
              width: 32,
              height: 32,
              fontSize: 14,
              transition: "transform 0.15s ease-in-out",
              "&:hover": { transform: "scale(1.08)" },
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
