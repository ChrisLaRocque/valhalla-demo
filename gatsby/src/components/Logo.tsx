import React from "react";

export default function Logo({ fill = "#181A1C", and = "" }) {
  return (
    <div
      id="logo-wrapper"
      className={`flex items-center justify-between gap-1`}
    >
      <svg
        width="128"
        height="128"
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9"
      >
        <g clipPath="url(#clip0_211_18)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M73.2261 2.81074L125.189 54.7739L127.115 56.7041L128 58.8388V69.1612L127.115 71.2959L125.189 73.2261L73.2261 125.189L71.2959 127.115L69.1612 128H58.8388L56.7041 127.115L54.7739 125.189L2.81074 73.2261L0.885028 71.2959L0 69.1612V58.8388L0.885028 56.7041L2.81074 54.7739L54.7739 2.81074L56.7041 0.885028L58.8388 0H69.1612L71.2959 0.885028L73.2261 2.81074ZM59.3681 91.0557V116.019L60.0307 116.681H67.9737L68.6364 116.019V91.0557L67.9737 90.393H60.0307L59.3681 91.0557ZM59.3681 36.9444V11.9813L60.0307 11.3186H67.9737L68.6364 11.9813V36.9444L67.9737 37.6071H60.0307L59.3681 36.9444ZM37.2957 97.5221H38.3898L45.6612 90.2462V84.4691L44.8874 83.6997L39.1102 83.6952L31.8388 90.9712V92.0652L37.2957 97.5221ZM31.8388 37.3046V36.215L37.2957 30.7536H38.3853L45.6612 38.0296V43.8023L44.8918 44.5805H39.1147L31.8388 37.3046ZM37.9361 59.3547H9.85983L9.19717 60.0174V67.9693L9.85983 68.632H37.9361L38.5988 67.9693V60.0174L37.9361 59.3547ZM78.8743 80.5376H70.9446L70.2819 79.875V61.2938C70.2864 57.985 68.9877 55.4233 64.994 55.3388C62.9437 55.2854 60.5911 55.3388 58.0828 55.4411L57.7047 55.828L57.7092 79.875L57.0465 80.5376H49.1079L48.4453 79.875V48.1251L49.1079 47.4625H66.9686C73.911 47.4625 79.5369 53.0884 79.5369 60.0307V79.875L78.8743 80.5376ZM90.0639 68.6453H118.14L118.803 67.9827V60.0307L118.14 59.3681H90.0639L89.4012 60.0307V67.9827L90.0639 68.6453Z"
            fill={fill}
          />
        </g>
        <defs>
          <clipPath id="clip0_211_18">
            <rect width="128" height="128" fill="white" />
          </clipPath>
        </defs>
      </svg>
      {and && (
        <>
          {/* Plus sign */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          {and === "contentful" && (
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 150 150"
              className="h-9 w-9"
            >
              <circle fill="#0033a3" cx="75" cy="75" r="75" />
              <path
                fill="#ffda00"
                d="M61.2,92.29a24.59,24.59,0,0,1-7.14-17.44,24.3,24.3,0,0,1,7.26-17.37A9.68,9.68,0,0,0,47.67,43.76a44,44,0,0,0-.19,62.18A9.68,9.68,0,1,0,61.2,92.29Z"
              />
              <path
                fill="#67b3ff"
                d="M61.32,57.48a24.57,24.57,0,0,1,17.44-7.14A24.32,24.32,0,0,1,96.13,57.6,9.67,9.67,0,1,0,109.84,44a43.82,43.82,0,0,0-62.11-.25A9.68,9.68,0,0,0,61.32,57.48Z"
              />
              <path
                fill="#eb5a68"
                d="M96.07,92.41a24.59,24.59,0,0,1-17.44,7.14,24.34,24.34,0,0,1-17.37-7.26,9.67,9.67,0,1,0-13.71,13.65,43.88,43.88,0,0,0,62.17.24A9.69,9.69,0,0,0,96.07,92.41Z"
              />
              <path
                fill="#47a1ff"
                d="M61.32,57.48a9.68,9.68,0,1,1,.06-13.65A9.71,9.71,0,0,1,61.32,57.48Z"
              />
              <path
                fill="#d5465f"
                d="M61.13,105.94a9.68,9.68,0,1,1,.07-13.65A9.7,9.7,0,0,1,61.13,105.94Z"
              />
            </svg>
          )}
          {and === "drupal" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="97.97727mm"
              height="128.01656mm"
              viewBox="0 0 277.73084 362.8816"
              className="h-9 w-9"
            >
              <g id="Livello_2" data-name="Livello 2">
                <g id="Livello_1-2" data-name="Livello 1">
                  <path
                    d="M196.00843,77.29177C170.47408,51.76951,146.11187,27.43962,138.86135,0c-7.25088,27.43962-31.617,51.76951-57.14709,77.29177C43.41893,115.56293,0,158.93748,0,223.99184,0,300.57855,62.291,362.8816,138.86135,362.8816c76.58243,0,138.86524-62.29879,138.86949-138.88976,0-65.05011-43.41537-108.42891-81.72241-146.70007M59.02214,256.34977c-8.51464-.28912-39.93878-54.453,18.35806-112.124L115.95754,186.365s2.36878,2.22706-.25751,4.92082c-9.2055,9.44134-48.44171,48.78732-53.31849,62.39221-1.0066,2.80815-2.47674,2.70194-3.3594,2.67175m79.84347,71.38635a47.759,47.759,0,0,1-47.75939-47.75938c0-12.09214,4.80716-22.86793,11.90389-31.54632,8.61161-10.53036,35.8491-40.148,35.8491-40.148s26.8205,30.05237,35.78481,40.04746a46.706,46.706,0,0,1,11.981,31.64684,47.75949,47.75949,0,0,1-47.75937,47.75938m91.41133-77.44876c-1.02935,2.25121-3.36439,6.00948-6.516,6.12421-5.6177.2046-6.218-2.67388-10.37017-8.819-9.116-13.49017-88.67067-96.63406-103.5507-112.71395-13.08844-14.143-1.84309-24.11392,3.37325-29.33914,6.54441-6.55613,25.6473-25.64732,25.6473-25.64732s56.96026,54.04379,80.68775,90.97055,15.55027,68.88013,10.72856,79.42469"
                    fill="#009cde"
                  />
                </g>
              </g>
            </svg>
          )}
        </>
      )}
    </div>
  );
}
