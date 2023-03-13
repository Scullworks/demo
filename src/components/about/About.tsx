import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import athletes from '@/assets/about/athletes.png';
import clubs from '@/assets/about/clubs.png';
import coaches from '@/assets/about/coaches.png';
import { useAnimationStore } from '@/hooks/store/useAnimationStore';
import content from '@/utils/about-content.json';
import {
    aboutVariants,
    athletesVariants,
    clubsVariants,
    coachesVariants,
    headingVariants
} from './About.animations';

function About() {
    const [isMediumMobile, setIsMediumMobile] = useState(false);
    const headerBenefitsIsInView = useAnimationStore(state => state.headerBenefitsIsInView);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth <= 375) {
            setIsMediumMobile(true);
        }
    }, [isMediumMobile]);

    return (
        <section className="about">
            <motion.h2
                className="about__heading"
                initial="initial"
                whileInView="animate"
                custom={isMediumMobile ? true : headerBenefitsIsInView}
                viewport={{ once: true }}
                variants={headingVariants}
            >
                Benefits for everyone
            </motion.h2>
            <motion.div
                className="about__benefits"
                initial="initial"
                whileInView="animate"
                custom={isMediumMobile ? true : headerBenefitsIsInView}
                viewport={{ once: true }}
                variants={aboutVariants}
            >
                {/* Athletes Card */}
                <motion.div
                    className="about__athletes"
                    viewport={{ once: true }}
                    variants={athletesVariants}
                >
                    <Image
                        className="about__athletes-image"
                        src={athletes}
                        alt="People rowing illustrations by StorySet"
                    />
                    <div className="about__athletes-text-container">
                        <h3>Athletes</h3>
                        <p>{content.athletes}</p>
                    </div>
                </motion.div>

                {/* Clubs Card */}
                <motion.div
                    className="about__clubs"
                    viewport={{ once: true }}
                    variants={clubsVariants}
                >
                    <Image
                        className="about__clubs-image"
                        src={clubs}
                        alt="People coaching illustrations by StorySet"
                    />
                    <div className="about__clubs-text-container">
                        <h3>Clubs</h3>
                        <p>{content.clubs}</p>
                    </div>
                </motion.div>

                {/* Coaches Card */}
                <motion.div
                    className="about__coaches"
                    viewport={{ once: true }}
                    variants={coachesVariants}
                >
                    <Image
                        className="about__coaches-image"
                        src={coaches}
                        alt="People coaching illustrations by StorySet"
                    />
                    <div className="about__coaches-text-container">
                        <h3>Coaches</h3>
                        <p>{content.coaches}</p>
                    </div>
                </motion.div>
            </motion.div>
            <Link href="/">
                <button className="about__button">Request a Demo</button>
            </Link>
        </section>
    );
}

export default About;
