import emailjs from '@emailjs/browser';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { HookedTextField, SnackbarAlert } from '@/components';
import content from '@/utils/content/contact-us.json';
import { contactUsSchema } from '@/utils/validations';
import { animations } from './ContactUs.animations';

export interface ContactUsFormValues {
    readonly name: string;
    readonly email: string;
    readonly message: string;
}

function ContactUs() {
    const [showAlert, setShowAlert] = useState(false);

    const {
        control,
        handleSubmit,
        reset: clearFields,
        formState: { errors }
    } = useForm<ContactUsFormValues>({
        resolver: yupResolver(contactUsSchema),
        defaultValues: {
            name: '',
            email: '',
            message: ''
        }
    });

    const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 430);
    const isMobile = isMobileRef.current;

    const onSubmit = handleSubmit(async data => {
        const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
        const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
        const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, { ...data }, PUBLIC_KEY);
            setShowAlert(true);
            clearFields();
        } catch (error) {
            console.error('Contact Us Error: ', error.message);
        }
    });

    return (
        <footer className="contact-us">
            <motion.h2 className="contact-us__heading" custom={isMobile} {...animations}>
                Get In Touch
            </motion.h2>
            <motion.p className="contact-us__text" custom={isMobile} {...animations}>
                {content.subText}
            </motion.p>
            <motion.form
                className="contact-us-form"
                onSubmit={onSubmit}
                custom={isMobile}
                {...animations}
            >
                <HookedTextField name="name" control={control} error={errors?.name?.message} />
                <HookedTextField name="email" control={control} error={errors?.email?.message} />
                <HookedTextField name="message" control={control} error={errors.message?.message} />
                <button className="contact-us-form__button button" type="submit">
                    Submit
                </button>
            </motion.form>
            <SnackbarAlert
                text="Message sent!"
                severity="success"
                open={showAlert}
                setOpen={setShowAlert}
            />
        </footer>
    );
}

export default ContactUs;
