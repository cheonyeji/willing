type IconYesterdayProps = {
  onClick: () => void;
};

function IconYesterday(props: IconYesterdayProps) {
  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Exclude">
        <path
          id="Exclude_2"
          fillRule="evenodd"
          clipRule="evenodd"
          onClick={props.onClick}
          d="M10 0.500001C4.47715 0.500001 -1.35705e-06 4.97715 -8.74228e-07 10.5C-3.91405e-07 16.0228 4.47715 20.5 10 20.5C15.5228 20.5 20 16.0228 20 10.5C20 4.97715 15.5228 0.5 10 0.500001ZM11.6877 14.8904C11.9033 15.0629 12.2179 15.028 12.3904 14.8123C12.5629 14.5967 12.528 14.2821 12.3123 14.1096L7.80039 10.5L12.3123 6.89043C12.528 6.71793 12.5629 6.40328 12.3904 6.18765C12.2179 5.97202 11.9033 5.93706 11.6877 6.10957L6.68765 10.1096C6.56904 10.2045 6.5 10.3481 6.5 10.5C6.5 10.6519 6.56904 10.7955 6.68765 10.8904L11.6877 14.8904Z"
          fill="#CAE2FE"
        />
      </g>
    </svg>
  );
}

export default IconYesterday;
