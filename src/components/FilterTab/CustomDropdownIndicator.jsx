import { components } from "react-select";

const CustomDropdownIndicator = (props) => {
  const { selectProps } = props;
  const isOpen = selectProps.menuIsOpen;

  return (
    <components.DropdownIndicator {...props}>
      <img
        src="/icons/active.svg"
        alt="arrow"
        width={20}
        height={20}
        style={{
          transition: "transform 0.3s ease",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
        }}
      />
    </components.DropdownIndicator>
  );
};

export default CustomDropdownIndicator;
