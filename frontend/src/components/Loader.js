import { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80px]">
      <div className="border-4 border-gray-200 border-t-blue-600 rounded-full w-10 h-10 animate-spin mt-8 mb-2"></div>
      <div className="mt-2 text-blue-600 font-bold">{text}</div>
    </div>
  );
} 