import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { HookedTextField } from '@/components';
import content from '@/utils/content/contact-us.json';
import { contactUsSchema } from '@/utils/validations';
import { animations } from './ContactUs.animations';

export interface ContactUsFormValues {
    readonly name: string;
    readonly email: string;
    readonly message: string;
}

function ContactUs() {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ContactUsFormValues>({
        resolver: yupResolver(contactUsSchema)
    });

    const onSubmit = handleSubmit(data => {
        // TODO: Discuss what needs to be done at this point
        console.log('data', data);
    });

    return (
        <footer className="contact-us">
            <motion.h2 className="contact-us__heading" {...animations}>
                Get In Touch
            </motion.h2>
            <motion.p className="contact-us__text" {...animations}>
                {content.subText}
            </motion.p>
            <motion.form className="contact-us-form" onSubmit={onSubmit} {...animations}>
                <HookedTextField name="name" control={control} error={errors?.name?.message} />
                <HookedTextField name="email" control={control} error={errors?.email?.message} />
                <HookedTextField name="message" control={control} error={errors.message?.message} />
                <button className="contact-us-form__button" type="submit">
                    Submit
                </button>
            </motion.form>
        </footer>
    );
}

export default ContactUs;
