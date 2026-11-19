"use client"

import { useEffect, useId, useRef, useState } from "react"
import { LuChevronDown } from "react-icons/lu"

export type CustomDropdownOption = {
  label: string
  value: string
}

export function CustomDropdown({
  label,
  name,
  options,
  value,
}: {
  label: string
  name: string
  options: CustomDropdownOption[]
  value: string
}) {
  const id = useId()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const initialSelectedIndex = Math.max(
    options.findIndex((option) => option.value === value),
    0,
  )
  const [selectedValue, setSelectedValue] = useState(value)
  const [activeIndex, setActiveIndex] = useState(initialSelectedIndex)
  const [isOpen, setIsOpen] = useState(false)
  const selectedIndex = Math.max(
    options.findIndex((option) => option.value === selectedValue),
    0,
  )
  const selectedOption = options.find((option) => option.value === selectedValue)

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[activeIndex]?.focus()
    }
  }, [activeIndex, isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)

    return () => document.removeEventListener("pointerdown", handlePointerDown)
  }, [isOpen])

  function openAt(index: number) {
    setActiveIndex(index)
    setIsOpen(true)
  }

  function closeMenu() {
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  function handleTriggerKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      const direction = event.key === "ArrowDown" ? 1 : -1

      if (!isOpen) {
        openAt(event.key === "ArrowDown" ? selectedIndex : options.length - 1)
      } else {
        setActiveIndex(
          (current) => (current + direction + options.length) % options.length,
        )
      }
    } else if (!isOpen && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault()
      openAt(selectedIndex)
    } else if (isOpen && event.key === "Escape") {
      event.preventDefault()
      closeMenu()
    }
  }

  function handleOptionKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault()
      closeMenu()
      return
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()
      const direction = event.key === "ArrowDown" ? 1 : -1
      setActiveIndex((current) => (current + direction + options.length) % options.length)
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault()
      setActiveIndex(event.key === "Home" ? 0 : options.length - 1)
    }
  }

  function selectOption(option: CustomDropdownOption) {
    setSelectedValue(option.value)
    setIsOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <div
      ref={wrapperRef}
      onBlur={(event) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node)) {
          setIsOpen(false)
        }
      }}
      className="relative space-y-2 text-sm font-semibold text-slate-800"
    >
      <span id={`${id}-label`}>{label}</span>
      <input type="hidden" name={name} value={selectedValue} />
      <button
        ref={triggerRef}
        type="button"
        aria-labelledby={`${id}-label ${id}-value`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false)
          } else {
            openAt(selectedIndex)
          }
        }}
        onKeyDown={handleTriggerKeyDown}
        className="input-field flex items-center justify-between gap-3 text-right"
      >
        <span id={`${id}-value`}>{selectedOption?.label ?? label}</span>
        <LuChevronDown
          aria-hidden="true"
          className={`size-4 shrink-0 text-[var(--text-muted)] transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen ? (
        <div
          id={`${id}-listbox`}
          role="listbox"
          aria-labelledby={`${id}-label`}
          onKeyDown={handleOptionKeyDown}
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-[var(--border)] bg-white p-2 shadow-[var(--shadow-card)]"
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              ref={(element) => {
                optionRefs.current[index] = element
              }}
              type="button"
              role="option"
              aria-selected={option.value === selectedValue}
              tabIndex={activeIndex === index ? 0 : -1}
              onClick={() => selectOption(option)}
              className={`w-full rounded-xl px-4 py-3 text-right text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                option.value === selectedValue
                  ? "bg-[var(--surface-muted)] text-[var(--accent)]"
                  : "text-slate-700 hover:bg-[var(--surface-muted)]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
