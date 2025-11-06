import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/GeneralComp/TempInputComponent";

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
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900 h-screen">
        {/* <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <LogoComp />
        </div> */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm shadow-sm shadow-gray-700 p-10 rounded-lg bg-gray-800/50">
          <form action="#" method="POST" className="space-y-6">
            <InputComponent
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              label="Email"
            />

            <InputComponent
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              label="Password"
            />

            <div className="justify-center flex mt-8">
              <ButtonComponent
                label="Login"
                size="large"
                onClick={() => {
                  console.log("Sign in clicked");
                }}
              />
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-400">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold text-secondary-400 hover:text-secondary-300"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
