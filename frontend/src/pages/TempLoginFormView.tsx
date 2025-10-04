import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/GeneralComp/InputComponent";
import LogoComp from "../components/LoginFormComp/LogoComp";

export default function TempLoginFormView() {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-900">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <LogoComp />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <InputComponent
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              label="Email Address"
            />

            <InputComponent
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              label="Password"
            />

            <div>
              <ButtonComponent
                label="Sign in"
                onClick={() => {
                  console.log("Sign in clicked");
                }}
                size="large"
              />
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-400 hover:text-indigo-300"
            >
              Start a 14 day free trial
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
