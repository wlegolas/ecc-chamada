'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

const SEARCH_DEBOUNCE_DELAY_MS = 400;

export interface SearchAttendancesProps {
  onSearch: (value: string) => void;
}

export function SearchAttendances({ onSearch }: SearchAttendancesProps) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      onSearch(search);
    }, SEARCH_DEBOUNCE_DELAY_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [search, onSearch]);

  return (
    <InputGroup className="max-w h-10">
      <InputGroupInput
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Informe o nome do casal ou do círculo para filtar os dados"
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon
        className={search ? 'block' : 'hidden'}
        align="inline-end"
      >
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => setSearch('')}
        >
          <X />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
