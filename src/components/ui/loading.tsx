type LoadingProps = {
  color?: string;
};
function Loading({ color }: LoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* <p className="text-lg text-center text-white min-w-52">
        Free servers have a spin up time of approximately 50 seconds.
      </p>
      <p className="text-lg text-center text-white">Please be patient!</p> */}
      <div className="w-14 h-14">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <radialGradient
            id="a5"
            cx=".66"
            fx=".66"
            cy=".3125"
            fy=".3125"
            gradientTransform="scale(1.5)"
          >
            <stop offset="0" stopColor={color || "#FFFFFF"}></stop>
            <stop
              offset=".3"
              stopColor={color || "#FFFFFF"}
              stopOpacity=".9"
            ></stop>
            <stop
              offset=".6"
              stopColor={color || "#FFFFFF"}
              stopOpacity=".6"
            ></stop>
            <stop
              offset=".8"
              stopColor={color || "#FFFFFF"}
              stopOpacity=".3"
            ></stop>
            <stop
              offset="1"
              stopColor={color || "#FFFFFF"}
              stopOpacity="0"
            ></stop>
          </radialGradient>
          <circle
            transform-origin="center"
            fill="none"
            stroke="url(#a5)"
            strokeWidth="15"
            strokeLinecap="round"
            strokeDasharray="200 1000"
            strokeDashoffset="0"
            cx="100"
            cy="100"
            r="70"
          >
            <animateTransform
              type="rotate"
              attributeName="transform"
              calcMode="spline"
              dur="2"
              values="360;0"
              keyTimes="0;1"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animateTransform>
          </circle>
          <circle
            transform-origin="center"
            fill="none"
            opacity=".2"
            stroke={color || "#FFFFFF"}
            strokeWidth="15"
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="70"
          ></circle>
        </svg>
      </div>
    </div>
  );
}

export default Loading;
