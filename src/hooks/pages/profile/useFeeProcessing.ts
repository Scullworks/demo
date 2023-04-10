import { useEffect, useState } from 'react';
import { useFeeProcessingStore } from '@/hooks/store';

export function useFeeProcessing() {
    const [payoutText, setPayoutText] = useState<string | null>(null);
    const [guestPayoutText, setGuestPayoutText] = useState<string | null>(null);

    const feeProcessingOption = useFeeProcessingStore(state => state.feeProcessingOption);
    const memberPrice = useFeeProcessingStore(state => state.memberPrice);
    const guestPrice = useFeeProcessingStore(state => state.guestPrice);
    const memberPriceToCharge = useFeeProcessingStore(state => state.memberPriceToCharge);
    const guestPriceToCharge = useFeeProcessingStore(state => state.guestPriceToCharge);
    const memberPayout = useFeeProcessingStore(state => state.memberPayout);
    const guestPayout = useFeeProcessingStore(state => state.guestPayout);
    const setMemberPriceToCharge = useFeeProcessingStore(state => state.setMemberPriceToCharge);
    const setGuestPriceToCharge = useFeeProcessingStore(state => state.setGuestPriceToCharge);
    const setMemberPayout = useFeeProcessingStore(state => state.setMemberPayout);
    const setGuestPayout = useFeeProcessingStore(state => state.setGuestPayout);

    useEffect(() => {
        if (Number.isNaN(memberPrice)) setPayoutText(null);

        if (memberPrice && feeProcessingOption === 'Absorb Fees') {
            const priceToCharge = memberPrice - 0.3;
            const fees = (memberPrice - 0.3) * 0.079 + 0.3;
            const payout = memberPrice - 0.3 - roundDown(fees);
            setMemberPriceToCharge(priceToCharge);
            setMemberPayout(roundDown(payout));
            setPayoutText(`*Your payout after Stripe and platform fees will be $${memberPayout}.`);
        }

        if (memberPrice && feeProcessingOption === 'Split Fees') {
            const priceToCharge = memberPrice / 0.96;
            const fees = priceToCharge * 0.079 + 0.3;
            const payout = priceToCharge - roundDown(fees);
            setMemberPriceToCharge(roundDown(priceToCharge));
            setMemberPayout(roundDown(payout));
            setPayoutText(
                `*Session price will be $${memberPriceToCharge}. After Stripe and platform fees, your payout will be $${memberPayout}.`
            );
        }

        if (memberPrice && feeProcessingOption === 'Pass On Fees') {
            const priceToCharge = memberPrice / 0.921;
            const fees = priceToCharge * 0.079 + 0.3;
            const payout = priceToCharge - roundDown(fees);
            setMemberPriceToCharge(roundDown(priceToCharge));
            setMemberPayout(roundDown(payout));
            setPayoutText(
                `*Session price will be $${memberPriceToCharge}. After Stripe and platform fees, your payout will be $${memberPayout}.`
            );
        }
    }, [
        feeProcessingOption,
        memberPayout,
        memberPrice,
        memberPriceToCharge,
        setMemberPayout,
        setMemberPriceToCharge
    ]);

    useEffect(() => {
        if (Number.isNaN(guestPrice)) setGuestPayoutText(null);

        if (guestPrice && feeProcessingOption === 'Absorb Fees') {
            const priceToCharge = guestPrice - 0.3;
            const fees = (guestPrice - 0.3) * 0.079 + 0.3;
            const payout = guestPrice - 0.3 - roundDown(fees);
            if (guestPriceToCharge) setGuestPriceToCharge(priceToCharge);
            setGuestPayout(roundDown(payout));
            setGuestPayoutText(
                `**Your payout after Stripe and platform fees will be $${guestPayout}.`
            );
        }

        if (guestPrice && feeProcessingOption === 'Split Fees') {
            const priceToCharge = guestPrice / 0.96;
            const fees = priceToCharge * 0.079 + 0.3;
            const payout = priceToCharge - roundDown(fees);
            setGuestPriceToCharge(roundDown(priceToCharge));
            setGuestPayout(roundDown(payout));
            setGuestPayoutText(
                `**Session price will be $${guestPriceToCharge}. After Stripe and platform fees, your payout will be $${guestPayout}.`
            );
        }

        if (guestPrice && feeProcessingOption === 'Pass On Fees') {
            const priceToCharge = guestPrice / 0.921;
            const fees = priceToCharge * 0.079 + 0.3;
            const payout = priceToCharge - roundDown(fees);
            setGuestPriceToCharge(roundDown(priceToCharge));
            setGuestPayout(roundDown(payout));
            setGuestPayoutText(
                `**Session price will be $${guestPriceToCharge}. After Stripe and platform fees, your payout will be $${guestPayout}.`
            );
        }
    }, [
        feeProcessingOption,
        guestPayout,
        guestPrice,
        guestPriceToCharge,
        setGuestPayout,
        setGuestPriceToCharge
    ]);

    return {
        payoutText,
        guestPayoutText
    };
}

function roundDown(number: number) {
    return Math.floor(number * 100) / 100;
}
