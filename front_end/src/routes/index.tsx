
import ConfirmEmailPage from "../pages/ConfirmEmailPage/ConfirmEmailPage.tsx";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage.tsx";
import LoginPage from "../pages/LoginPage/LoginPage.tsx"
import ThankYouPage from "../pages/ThankYouPage/ThankYouPage.tsx";
import EmailTemplate from "../pages/EmailTemplate/EmailTemplate.tsx";
export const routes=[
    {
        path:"/",
        page: RegistrationPage,
        isShowHeader: true,
    },
    {
        path:"/login",
        page: LoginPage,
        isShowHeader: true,
    },
     {
        path:"/ConfirmEmail",
        page: ConfirmEmailPage,
        isShowHeader: true,
    },
    {
        path:"/ThankYou",
        page: ThankYouPage,
        isShowHeader: true,
    },

    // test email template
    {
        path:"/EmailTemplate",
        page: EmailTemplate,
        isShowHeader: false,
    }
]