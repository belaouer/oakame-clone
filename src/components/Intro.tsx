"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import me from "../../public/02.webp";

interface IntroProps {
  setIntroFinished: React.Dispatch<React.SetStateAction<boolean>>;
  imageRef: React.RefObject<HTMLImageElement | null>;
}

const Intro = ({ setIntroFinished, imageRef }: IntroProps) => {
  const container = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const span1 = useRef<HTMLSpanElement>(null);
  const span2 = useRef<HTMLSpanElement>(null);
  const counterRef1 = useRef<HTMLSpanElement>(null);
  const counterRef2 = useRef<HTMLSpanElement>(null);
  const svgContainer = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      let tl = gsap.timeline();
      // Valeur animée pour le compteur
      const counter = { value: 0 };

      tl.addLabel("startAnimation")
        .to(span1.current, {
          delay: 0.1,
          x: "-70%",
          duration: 1,
          ease: "power2.out",
        })
        .to(
          span2.current,
          { x: "70%", duration: 1, ease: "power2.out" },
          "startAnimation"
        )
        .to(".counter", { opacity: 1, duration: 0.2 }, "startAnimation")
        .to(
          imageContainer.current,
          {
            scale: 1,
            width: 385,
            duration: 1,
            ease: "power2.out",
          },
          "startAnimation"
        )
        .to(
          counter,
          {
            delay: 0.05,
            value: 100,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => {
              if (counterRef1.current && counterRef2.current) {
                counterRef1.current.textContent = String(
                  Math.floor(counter.value)
                ).padStart(2, "0");
                counterRef2.current.textContent = String(
                  Math.floor(counter.value)
                ).padStart(2, "0");
              }
            },
            onComplete: () => setIntroFinished(true),
          },
          "<-0.1"
        )
        .addLabel("reset")
        .to(
          span1.current,
          {
            x: 0,
            duration: 1,
            ease: "power2.out",
          },
          "reset"
        )
        .to(span2.current, { x: 0, duration: 1, ease: "power2.out" }, "reset")
        .to(svgContainer.current, { opacity: 0, ese: "power2.out" }, "reset");
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="absolute top-0 left-0 w-screen h-screen flex flex-col justify-center items-center p-8"
    >
      <div ref={svgContainer} className="mx-auto w-[4.25rem] h-[4.7rem]">
        <svg viewBox="0 0 44 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.33877 37.1865C1.84716 37.1865 0.722656 38.348 0.722656 39.8881C0.722656 41.4282 1.84716 42.5896 3.33877 42.5896C4.83038 42.5896 5.94475 41.4029 5.94475 39.8881C5.94475 38.3733 4.79997 37.1865 3.33877 37.1865ZM3.33877 37.4957C3.95859 37.4957 4.69788 37.9106 4.69788 39.8881C4.69788 41.8656 3.95931 42.2696 3.33877 42.2696C2.14693 42.2696 1.96953 40.7773 1.96953 39.8881C1.96953 38.9989 2.14765 37.4957 3.33877 37.4957Z"
            fill="#403A34"
          ></path>
          <path
            d="M12.6197 41.6585C12.5452 41.8909 12.3801 42.1632 12.1607 42.1632C12.0955 42.1632 12.0687 42.1436 12.055 42.1291C11.9717 42.0451 11.9731 41.7801 11.9746 41.5238V39.3443C11.9746 37.8918 11.2968 37.1865 9.90226 37.1865C8.99209 37.1865 8.01023 37.6854 8.01023 38.492C8.01023 38.8345 8.23687 39.0836 8.54823 39.0836C8.85958 39.0836 9.08622 38.8642 9.08622 38.5239C9.08622 38.3776 9.06233 38.2821 9.04133 38.1973C9.02467 38.1293 9.01164 38.0757 9.01164 38.0018C9.01164 37.5319 9.693 37.4957 9.90154 37.4957C10.1666 37.4957 10.3613 37.5616 10.496 37.697C10.7972 37.9997 10.7943 38.6354 10.7922 39.3088V39.4507C10.6879 39.463 10.5728 39.4768 10.4533 39.4906C10.1904 39.521 9.91819 39.5528 9.68866 39.5861C8.90954 39.7129 7.60547 39.925 7.60547 41.1885C7.60547 42.0792 8.2948 42.5896 9.49677 42.5896C10.1441 42.5896 10.5807 42.2435 10.8327 41.8293C10.9717 42.4463 11.4388 42.5896 11.8414 42.5896C12.3699 42.5896 12.7421 42.3036 12.9166 41.762L12.9521 41.6534L12.6683 41.5115L12.6205 41.6592L12.6197 41.6585ZM10.5329 39.8026C10.6234 39.7925 10.7111 39.7824 10.7914 39.7722V40.8033C10.7914 41.5187 10.3432 42.258 9.59235 42.258C8.91461 42.258 8.84076 41.5013 8.84076 41.1762C8.84076 40.4442 9.15573 40.0148 9.7741 39.9011C10.0101 39.862 10.2875 39.8302 10.5329 39.8019V39.8026Z"
            fill="#403A34"
          ></path>
          <path
            d="M17.4891 39.1158L18.9134 37.6025H19.7881V37.2824H17.689V37.6025H18.4739L16.2075 40.0202V34.7568H14.2148V35.0769H15.0244V42.1635H14.2148V42.4835H17.0279V42.1635H16.2075V40.4851L16.6927 39.976L18.0807 42.1635H17.4754V42.4835H20.1827V42.1635H19.4297L17.4891 39.1158Z"
            fill="#403A34"
          ></path>
          <path
            d="M26.4322 41.6585C26.354 41.9025 26.1919 42.1632 25.9732 42.1632C25.908 42.1632 25.8812 42.1436 25.8667 42.1291C25.7835 42.0451 25.7849 41.7794 25.7856 41.5231V39.3443C25.7856 37.8918 25.1079 37.1865 23.7133 37.1865C22.8039 37.1865 21.822 37.6854 21.822 38.492C21.822 38.8345 22.0486 39.0836 22.36 39.0836C22.6714 39.0836 22.898 38.8642 22.898 38.5239C22.898 38.3776 22.8741 38.2821 22.8538 38.1973C22.8372 38.1293 22.8241 38.0757 22.8241 38.0018C22.8241 37.5319 23.5055 37.4957 23.714 37.4957C23.9791 37.4957 24.1738 37.5616 24.3085 37.697C24.6097 37.9997 24.6068 38.6354 24.6047 39.3088V39.4507C24.5004 39.463 24.3853 39.4768 24.2658 39.4906C24.0029 39.521 23.7307 39.5528 23.5012 39.5861C22.722 39.7129 21.418 39.925 21.418 41.1885C21.418 42.0792 22.1073 42.5896 23.31 42.5896C23.9573 42.5896 24.394 42.2435 24.6459 41.8293C24.785 42.4463 25.252 42.5896 25.6546 42.5896C26.1832 42.5896 26.5553 42.3036 26.7298 41.762L26.7653 41.6534L26.4815 41.5115L26.4337 41.6592L26.4322 41.6585ZM24.3447 39.8026C24.4352 39.7925 24.5228 39.7824 24.6032 39.7722V40.8033C24.6032 41.5187 24.155 42.258 23.4041 42.258C22.7264 42.258 22.6525 41.5013 22.6525 41.1762C22.6525 40.4442 22.9675 40.0148 23.5859 39.9011C23.8219 39.862 24.0993 39.8302 24.3447 39.8019V39.8026Z"
            fill="#403A34"
          ></path>
          <path
            d="M36.1969 39.1959C36.1969 37.5355 35.2845 37.1865 34.5185 37.1865C33.6829 37.1865 33.2499 37.8034 33.0261 38.424C32.8342 37.6021 32.2984 37.1865 31.4281 37.1865C30.6787 37.1865 30.2543 37.7006 30.0161 38.2357V37.2828H28.0234V37.6029H28.8337V42.1639H28.0234V42.4839H30.8372V42.1639H30.0168V39.7715C30.0168 39.0315 30.3789 37.5811 31.2159 37.5811C31.8437 37.5811 31.9248 38.3639 31.9248 39.0467V42.1639H31.2637V42.4839H33.7683V42.1639H33.1072V39.7715C33.1072 39.0315 33.4693 37.5811 34.3063 37.5811C34.9348 37.5811 35.0152 38.3639 35.0152 39.0467V42.1639H34.2049V42.4839H37.0079V42.1639H36.1976V39.1959H36.1969Z"
            fill="#403A34"
          ></path>
          <path
            d="M43.2679 39.7128L43.2716 39.5832C43.2911 38.8903 43.0775 38.2936 42.6539 37.857C42.2397 37.4313 41.6438 37.1865 41.0175 37.1865C39.5635 37.1865 38.5078 38.3226 38.5078 39.8881C38.5078 41.4535 39.6482 42.5896 41.2202 42.5896C42.5258 42.5896 43.0065 41.6867 43.1231 41.4101L43.1716 41.295L42.8668 41.1422L42.8132 41.2769C42.63 41.7345 42.1029 42.2696 41.221 42.2696C39.8264 42.2696 39.7554 40.2856 39.7554 39.8881V39.7121H43.2687L43.2679 39.7128ZM41.0175 37.4964C41.8596 37.4964 42.0001 38.8114 42.0211 39.3935H39.7742C39.8285 38.7281 40.0588 37.4964 41.0168 37.4964H41.0175Z"
            fill="#403A34"
          ></path>
          <path
            d="M43.279 46.0146H0.75V46.4998H43.279V46.0146Z"
            fill="#403A34"
          ></path>
          <path
            d="M22.0549 33.745L24.007 33.0456L25.9468 33.7443L25.9555 33.7479H33.1514C33.1956 33.7501 33.2391 33.7516 33.2847 33.7516C33.5135 33.7516 33.7423 33.7501 33.9704 33.7479H35.3375L43.2734 33.7494L29.1386 13.4903L20.0549 22.1438L27.9446 33.3186H25.949L24.0128 31.8241L22.0375 33.3207H20.0542V22.1438V16.5104L26.7708 10.0972V10.0958L32.5287 4.61155C32.5599 4.58186 32.5932 4.5529 32.6272 4.52611C35.1977 2.4813 37.6118 0.788389 40.1881 0.461103H40.246V0.0324457H30.3963V0.459655H30.4506C32.4006 0.678328 33.6279 1.4292 33.541 2.61598C33.5186 2.92371 33.3759 3.21045 33.1529 3.42333L26.5217 9.73806L20.0542 0.469792V0.459655H25.5348V0.0302734H0.748704V0.459655H6.04972V33.3193H0.742188V33.7487H22.0324"
            fill="#403A34"
          ></path>
        </svg>
      </div>
      <div className="relative w-full h-full text-xLarge font-bold tracking-tighter leading-none flex justify-center items-center">
        <span ref={span1} className="inline-block">
          OAK
        </span>
        <div className="text-sm font-light absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  min-w-[450px]">
          <div className="flex items-center space-x-8">
            <span
              ref={counterRef1}
              className="counter inline-block opacity-0 tracking-widest"
            >
              00
            </span>
            <div ref={imageContainer} className="relative w-52 h-36 scale-0">
              <Image
                ref={imageRef}
                src={me}
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
                alt="photo"
              />
            </div>
            <span
              ref={counterRef2}
              className="counter inline-block opacity-0 tracking-widest"
            >
              00
            </span>
          </div>
        </div>
        <span ref={span2}>AME</span>
      </div>
    </div>
  );
};

export default Intro;
