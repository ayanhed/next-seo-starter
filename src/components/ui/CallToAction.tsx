import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CallToActionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
}) => {
  return (
    <div className="hero bg-base-200 border border-base-300 rounded-2xl p-8">
      <div className="hero-content flex-col text-center">
        <h3 className="text-2xl font-semibold">{title}</h3>
        {description && (
          <p className="text-base-content/70 max-w-xl">{description}</p>
        )}
        <Link href={buttonHref} className="btn btn-primary gap-2">
          {buttonText}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
