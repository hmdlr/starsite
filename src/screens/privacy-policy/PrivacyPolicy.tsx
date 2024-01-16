import { FrontPaths } from "@hmdlr/utils";
import "./PrivacyPolicy.css";

export const PrivacyPolicy = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 20,
        margin: 20,
        borderRadius: 10,
        fontWeight: 700,
        width: "80%",
        marginTop: 50,
      }}
    >
      <h2>Privacy Policy</h2>
      <p className={"policy-entry"}>
        Your privacy is important to us. It is Starphish's policy to respect
        your privacy regarding any information we may collect from you across
        our website, <a href={FrontPaths["auth"]}>{FrontPaths["auth"]}</a>, and
        other sites and extensions we own and operate.
      </p>
      <p className={"policy-entry"}>
        We only ask for personal information when we truly need it to provide a
        service to you. We collect it by fair and lawful means, with your
        knowledge and consent. We also let you know why we’re collecting it and
        how it will be used.
      </p>
      <p className={"policy-entry"}>
        We only retain collected information for as long as necessary to provide
        you with your requested service. What data we store, we’ll protect
        within commercially acceptable means to prevent loss and theft, as well
        as unauthorised access, disclosure, copying, use or modification.
      </p>
      <p className={"policy-entry"}>
        We don’t share any personally identifying information publicly or with
        third-parties, except when required to by law.
      </p>
      <p className={"policy-entry"}>
        Our website may link to external sites that are not operated by us.
        Please be aware that we have no control over the content and practices
        of these sites, and cannot accept responsibility or liability for their
        respective privacy policies.
      </p>
      <p className={"policy-entry"}>
        You are free to refuse our request for your personal information, with
        the understanding that we may be unable to provide you with some of your
        desired services.
      </p>
      <p className={"policy-entry"}>
        Your continued use of our website and extension will be regarded as
        acceptance of our practices around privacy and personal information. If
        you have any questions about how we handle user data and personal
        information, feel free to contact us at{" "}
        <a href={`mailto:cristi.moldovan@starphish.app`}>our available email</a>
        .
      </p>
    </div>
  );
};
