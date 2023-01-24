import React from "react";

const urlContext = React.createContext<{
  location: Location;
  url: string;
  parameters: Record<string, string>;
}>({
  location: document.location,
  url: document.location.href,
  parameters: {},
});

export const useUrl = () => {
  return React.useContext(urlContext);
}

export const ProvideUrl = ({ children }: { children: any }) => {
  const url = useProvideUrl();
  return <urlContext.Provider value={url}>{children}</urlContext.Provider>;
}

function useProvideUrl() {
  const [location, setLocation] = React.useState<Location>(document.location);
  const [url, setUrl] = React.useState<string>(document.location.href);
  const [parameters, setParameters] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const listener = () => {
      setLocation(document.location);
      setUrl(document.location.href);
      setParameters(parseParameters(document.location.href));
    };

    window.addEventListener("popstate", listener);
    window.addEventListener("pushstate", listener);
    window.addEventListener("replacestate", listener);
    window.addEventListener("hashchange", listener);
    window.addEventListener("load", listener);

    return () => {
      window.removeEventListener("popstate", listener);
      window.removeEventListener("pushstate", listener);
      window.removeEventListener("replacestate", listener);
    };
  }, []);

  return {
    location,
    url,
    parameters,
  };
}

function parseParameters(url: string): Record<string, string> {
  const parameters: Record<string, string> = {};
  const parameterString = url.split("?")[1];
  if (parameterString) {
    parameterString.split("&").forEach((parameter) => {
      const [key, value] = parameter.split("=");
      parameters[key] = value;
    });
  }
  return parameters;
}
