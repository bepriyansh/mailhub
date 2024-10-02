export declare const sendEmail: (job: {
    data: {
        to: string;
        subject: string;
        text: string;
        mailId: string;
        mailPassword: string;
    };
}) => Promise<void>;
