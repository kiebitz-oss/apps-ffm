export const Loading: React.FC = () => {
  // animation effect while waiting for rendering
  return (
    <span className="flex justify-center items-center w-full h-full">
      <span className="flex relative w-10 h-10 bg-primary opacity-75 duration-500 animate-ping rounded-full"></span>
    </span>
  );
};
