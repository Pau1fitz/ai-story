import { Typography, TypographyProps } from "@mui/material";

interface HeaderTextProps extends TypographyProps {
  children: React.ReactNode;
}

export const HeaderText = ({
  children,
  ...typographyProps
}: HeaderTextProps) => {
  return (
    <Typography
      fontSize="44px"
      lineHeight="62px"
      variant="h1"
      fontWeight={700}
      fontFamily="Roboto Condensed"
      {...typographyProps}
    >
      {children}
    </Typography>
  );
};

export const SubHeaderText = ({
  children,
  ...typographyProps
}: HeaderTextProps) => {
  return (
    <Typography
      fontSize="31px"
      lineHeight="43px"
      variant="h3"
      fontWeight={700}
      fontFamily="Roboto Condensed"
      {...typographyProps}
    >
      {children}
    </Typography>
  );
};

export const SubTitleText = ({
  children,
  ...typographyProps
}: HeaderTextProps) => {
  return (
    <Typography
      fontSize="18px"
      lineHeight="25px"
      variant="subtitle1"
      fontWeight={700}
      fontFamily="Roboto Condensed"
      {...typographyProps}
    >
      {children}
    </Typography>
  );
};

export const BodyText = ({ children, ...typographyProps }: HeaderTextProps) => {
  return (
    <Typography
      fontSize="22px"
      lineHeight="25px"
      variant="body1"
      fontWeight={400}
      fontFamily="Roboto Condensed"
      {...typographyProps}
    >
      {children}
    </Typography>
  );
};
