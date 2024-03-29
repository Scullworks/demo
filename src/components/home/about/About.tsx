import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import athletes from '@/assets/about/athletes.png';
import clubs from '@/assets/about/clubs.png';
import coaches from '@/assets/about/coaches.png';
import { useAnimationStore } from '@/hooks/store';
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
    const headerBenefitsIsInView = useAnimationStore(state => state.headerBenefitsIsInView);

    const isMobileRef = useRef(typeof window !== 'undefined' && window.innerWidth <= 430);
    const isMobile = isMobileRef.current;

    return (
        <main className="about">
            <motion.h2
                className="about__heading"
                custom={isMobile ? true : headerBenefitsIsInView}
                variants={headingVariants}
                {...animations}
            >
                Benefits for everyone
            </motion.h2>
            <motion.div
                className="about__benefits"
                custom={isMobile ? true : headerBenefitsIsInView}
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
                    className="about__button button"
                    variants={buttonVariants}
                    initial="initial"
                    animate="animate"
                    viewport={{ once: true }}
                >
                    Request a Demo
                </motion.button>
            </Link>
        </main>
    );
}

export default About;
