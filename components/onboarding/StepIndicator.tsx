const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [1, 2, 3];

  return (
    <div className="flex items-center w-full max-w-md">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-1 items-center last:flex-none">
          {/* Circle */}
          <div
            className={`transition duration-1000 flex size-5 items-center justify-center rounded-full border-2 ${
              step <= currentStep
                ? "border-blue-500 bg-blue-500"
                : "border-gray-300 bg-white"
            }`}
          >
            <div
              className={`size-1.5 rounded-full ${
                step <= currentStep ? "bg-white" : "bg-gray-300"
              }`}
            />
          </div>

          {/* Line */}
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 flex-1 ${
                step < currentStep ? "bg-blue-500" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
