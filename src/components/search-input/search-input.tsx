"use client";

import React, { ComponentProps } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "../ui/input";

type SearchInputProps = Omit<ComponentProps<typeof Input>, "onChange"> & {
  onChange: (value: string) => void;
};

export const SearchInput = ({
  value,
  onChange,
  placeholder,
}: SearchInputProps) => {
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    250,
  );

  return (
    <Input
      defaultValue={value}
      placeholder={placeholder}
      onChange={handleSearch}
    />
  );
};
