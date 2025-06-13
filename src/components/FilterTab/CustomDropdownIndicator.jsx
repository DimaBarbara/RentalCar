import { components } from "react-select";

const CustomDropdownIndicator = (props) => {
  const { selectProps } = props;
  const isOpen = selectProps.menuIsOpen;

  return (
    <components.DropdownIndicator {...props}>
      {isOpen ? (
        <img
          src="/public/icons/active.svg"
          alt="arrow up"
          width={20}
          height={20}
        />
      ) : (
        <img
          src="/public/icons/default.svg"
          alt="arrow down"
          width={20}
          height={20}
        />
      )}
    </components.DropdownIndicator>
  );
};

export default CustomDropdownIndicator;
