import * as React from 'react';

import { Theme, styled } from '../../styles';

import { getStatusColor } from '../../model/events/categorization';
import { getStatusMessage } from '../../model/http/http-docs';
import { getReadableSize } from '../../util/buffer';
import { SuccessfulExchange } from '../../model/http/exchange';

import { SendCardSection } from './send-card-section';
import { Pill } from '../common/pill';
import { DurationPill } from '../common/duration-pill';

const ResponseStatusSectionCard = styled(SendCardSection)`
    padding-top: 7px;
    padding-bottom: 7px;
    flex-shrink: 0;
    flex-grow: 0;

    z-index: 1;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,${p => p.theme.boxShadowAlpha});

    > header {
        flex-direction: row;
        justify-content: flex-start;
    }
`;

export const ResponseStatusSection = (props: {
    exchange: SuccessfulExchange,
    theme: Theme
}) => {
    const response = props.exchange.response;

    return <ResponseStatusSectionCard
        className='ignores-expanded' // This always shows, even if something is expanded
        ariaLabel='Response status section'
        collapsed={false}
        headerAlignment='left'
    >
        <header>
            <Pill
                color={getStatusColor(response.statusCode, props.theme)}
            >
                { response.statusCode }: { response.statusMessage || getStatusMessage(response.statusCode) }
            </Pill>
            <DurationPill timingEvents={props.exchange.timingEvents} />
            <Pill title="The size of the raw encoded response body">
                { getReadableSize(response.body.encoded.byteLength) }
            </Pill>
        </header>
    </ResponseStatusSectionCard>;
}

export const PendingResponseStatusSection = (props: {
    theme: Theme
}) => {
    return <ResponseStatusSectionCard
        className='ignores-expanded' // This always shows, even if something is expanded
        ariaLabel='Response status section'
        collapsed={false}
        headerAlignment='left'
    >
        <header>
            <Pill
                color={getStatusColor(undefined, props.theme)}
            >
                &nbsp;...&nbsp;
            </Pill>
        </header>
    </ResponseStatusSectionCard>;
}