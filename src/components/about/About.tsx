import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import athletes from '@/assets/about/athletes.png';
import clubs from '@/assets/about/clubs.png';
import coaches from '@/assets/about/coaches.png';
import { useAnimationStore } from '@/hooks/store/useAnimationStore';
import content from '@/utils/content/about.json';
import {
    aboutVariants,
    animations,
    athletesVariants,
    buttonVariants,
    clubsVariants,
    coachesVariants,
    headingVariants
} from './About.animations';

function About() {
    const [isMediumMobileOrSmaller, setIsMediumMobileOrSmaller] = useState(false);
    const headerBenefitsIsInView = useAnimationStore(state => state.headerBenefitsIsInView);

    useEffect(() => {
        function checkWindowWidth() {
            if (window.innerWidth <= 375) {
                setIsMediumMobileOrSmaller(true);
            } else {
                setIsMediumMobileOrSmaller(false);
            }
        }

        window.addEventListener('resize', checkWindowWidth);

        return () => {
            window.removeEventListener('resize', checkWindowWidth);
        };
    }, [isMediumMobileOrSmaller]);

    return (
        <main className="about">
            <motion.h2
                className="about__heading"
                custom={isMediumMobileOrSmaller ? true : headerBenefitsIsInView}
                variants={headingVariants}
                {...animations}
            >
                Benefits for everyone
            </motion.h2>
            <motion.div
                className="about__benefits"
                custom={isMediumMobileOrSmaller ? true : headerBenefitsIsInView}
                variants={aboutVariants}
                {...animations}
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
                <motion.button
                    className="about__button"
                    variants={buttonVariants}
                    custom={isMediumMobileOrSmaller ? true : headerBenefitsIsInView}
                    {...animations}
                >
                    Request a Demo
                </motion.button>
            </Link>
        </main>
    );
}

export default About;
