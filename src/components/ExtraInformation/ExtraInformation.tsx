import { PropsWithChildren } from "react";
import "./ExtraInformation.scss";

interface ExtraInformationProps extends PropsWithChildren {
  text: string;
}

const ExtraInformation = ({
  text,
  children,
}: ExtraInformationProps): React.ReactElement => {
  return (
    <div className="no-records-information">
      {children}
      <h2 className="no-records-information__title">{text}</h2>
    </div>
  );
};

export default ExtraInformation;
