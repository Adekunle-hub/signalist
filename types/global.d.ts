import { UseFormRegister } from "react-hook-form";

declare global {
  type signUpForm = {
    fullName: string;
    email: string;
    password: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferedIndustry: string;
  };

  type SignInFormData = {
    email: string;
    password: string;
  };

  type User = {
    id: string;
    email: string;
    name: string;
    image:string;
  };

  type FormInputProps = {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    register: UseFormRegister;
    error?: FieldError;
    validation?: RegisterOptions;
    disabled?: boolean;
    value?: string;
  };

  type selectOption = {
    value: string;
    label: string;
  };

  type selectFieldProps = {
    name: string;
    options: selectOption[];
    placeholder: string;
    register: UseFormRegister;
  };

  type footerLink = {
    text: string;
    action: string;
    link: string;
  };

  type welcomeEmailData = {
    email: string;
    name: string;
    intro: string;
  };

  type tradingViewWidgetProps = {
    title?: string;
    scriptUrl: string;
    config: Record<string, unknown>;
    height?: number;
    className?: string;
  };

  type SelectedStock = {
    symbol: string;
    company: string;
    currentPrice?: number;
  };

  type WatchlistTableProps = {
    watchlist: StockWithData[];
  };

  type StockWithData = {
    userId: string;
    symbol: string;
    company: string;
    addedAt: Date;
    currentPrice?: number;
    changePercent?: number;
    priceFormatted?: string;
    changeFormatted?: string;
    marketCap?: string;
    peRatio?: string;
  };

  type AlertsListProps = {
    alertData: Alert[] | undefined;
  };

  type MarketNewsArticle = {
    id: number;
    headline: string;
    summary: string;
    source: string;
    url: string;
    datetime: number;
    category: string;
    related: string;
    related?: string;
    image?: string;
  };
  type UserForNewsEmail = {
    id: string;
    email: string;
    name: string;
  };

  type WatchlistNewsProps = {
    news?: MarketNewsArticle[];
  };

  type SearchCommandProps = {
    open?: boolean;
    setOpen?: (open: boolean) => void;
    renderAs?: "button" | "text";
    buttonLabel?: string;
    buttonVariant?: "primary" | "secondary";
    className?: string;
  };

  type AlertData = {
    symbol: string;
    company: string;
    alertName: string;
    alertType: "upper" | "lower";
    threshold: string;
  };

  type AlertModalProps = {
    alertId?: string;
    alertData?: AlertData;
    action?: string;
    open: boolean;
    setOpen: (open: boolean) => void;
  };

  type RawNewsArticle = {
    id: number;
    headline?: string;
    summary?: string;
    source?: string;
    url?: string;
    datetime?: number;
    image?: string;
    category?: string;
    related?: string;
  };

  type Alert = {
    id: string;
    symbol: string;
    company: string;
    alertName: string;
    currentPrice: number;
    alertType: "upper" | "lower";
    threshold: number;
    changePercent?: number;
  };
}

export {};
