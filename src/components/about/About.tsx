import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import athletes from '@/assets/about/athletes.png';
import clubs from '@/assets/about/clubs.png';
import coaches from '@/assets/about/coaches.png';
import { useAnimationStore } from '@/hooks/store/useAnimationStore';
import content from '@/utils/about-content.json';
import {
    athletesVariants,
    clubsVariants,
    coachesVariants,
    headingVariants
} from './About.animations';

function About() {
    const headerBenefitsIsInView = useAnimationStore(state => state.headerBenefitsIsInView);

    return (
        <motion.div className="about">
            <motion.h2
                className="about__heading"
                initial="initial"
                whileInView="animate"
                custom={headerBenefitsIsInView}
                viewport={{ once: true }}
                variants={headingVariants}
            >
                Benefits for everyone
            </motion.h2>
            <div className="about__benefits">
                {/* Athletes Card */}
                <motion.div
                    className="about__athletes"
                    initial="initial"
                    whileInView="animate"
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
                    initial="initial"
                    whileInView="animate"
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
                    initial="initial"
                    whileInView="animate"
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
            </div>
            <Link href="/">
                <button className="about__button">Request a Demo</button>
            </Link>
        </motion.div>
    );
}

export default About;
