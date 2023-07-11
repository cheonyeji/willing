type IconTomorrowProps = {
  onClick: () => void;
};
function IconTomorrow(props: IconTomorrowProps) {
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
          onClick={props.onClick}
          id="Exclude_2"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 20.5C15.5228 20.5 20 16.0228 20 10.5C20 4.97715 15.5228 0.5 10 0.5C4.47715 0.5 0 4.97715 0 10.5C0 16.0228 4.47715 20.5 10 20.5ZM8.31235 6.10957C8.09672 5.93706 7.78207 5.97202 7.60957 6.18765C7.43706 6.40328 7.47202 6.71793 7.68765 6.89043L12.1996 10.5L7.68765 14.1096C7.47202 14.2821 7.43706 14.5967 7.60957 14.8123C7.78207 15.028 8.09672 15.0629 8.31235 14.8904L13.3123 10.8904C13.431 10.7955 13.5 10.6519 13.5 10.5C13.5 10.3481 13.431 10.2045 13.3123 10.1096L8.31235 6.10957Z"
          fill="#CAE2FE"
        />
      </g>
    </svg>
  );
}

export default IconTomorrow;
