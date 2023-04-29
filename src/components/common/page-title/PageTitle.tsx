import Head from 'next/head';

interface PageTitleProps {
    readonly text: string;
    readonly custom?: boolean;
}

function PageTitle(props: PageTitleProps) {
    const { text, custom = false } = props;

    return (
        <Head>
            <title>{custom ? text : text + ' | ScullWorks'}</title>
        </Head>
    );
}

export default PageTitle;
