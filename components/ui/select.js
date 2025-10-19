import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/utils";
import { ChevronDown } from "lucide-react";

export function Select({ value, onValueChange, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            isOpen,
          });
        }
        if (child.type === SelectContent && isOpen) {
          return React.cloneElement(child, {
            onSelect: (selectedValue) => {
              onValueChange(selectedValue);
              setIsOpen(false);
            },
            value,
          });
        }
        return null;
      })}
    </div>
  );
}

export function SelectTrigger({ className, children, onClick, isOpen, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
    </button>
  );
}

export function SelectValue({ placeholder, children }) {
  return <span>{children || placeholder}</span>;
}

export function SelectContent({ className, children, onSelect, value, ...props }) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (child.type === SelectItem) {
          return React.cloneElement(child, {
            onSelect,
            isSelected: child.props.value === value,
          });
        }
        return child;
      })}
    </div>
  );
}

export function SelectItem({ className, children, value, onSelect, isSelected, ...props }) {
  return (
    <div
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected && "bg-accent text-accent-foreground",
        className
      )}
      onClick={() => onSelect(value)}
      {...props}
    >
      {children}
    </div>
  );
}