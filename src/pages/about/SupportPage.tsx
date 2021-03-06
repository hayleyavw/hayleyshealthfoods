import React from 'react'
import { StyledHeadingOne } from '../../components/common/Headings.styled'
import { ButtonLink } from '../../components/ButtonLink/ButtonLink'
import { AboutMenu } from '../../components/AboutMenu/AboutMenu'
import { StyledContentBox } from '../../components/common/ContentBox.styled'
import { StyledButtonWrapper } from '../../components/CommonAbout/CommonAbout.styled'
import Helmet from 'react-helmet'
import { jsonld } from '../../components/common/jsonld'
import { StyledAnchor } from '../../components/common/Anchor.styled'

const SupportPage: React.FC = () => {
    const supportIcon = require('../../assets/buy-me-a-smoothie.svg')
    return (
        <React.Fragment>
            <Helmet>
                <script type="application/ld+json">{jsonld}</script>
            </Helmet>
            <AboutMenu />
            <StyledContentBox>
                <StyledHeadingOne>Help me to keep making cool things!</StyledHeadingOne>
                <p>
                    I have so many ideas for recipes to create and features to add this website, but
                    unfortunately they all take time. There is also a small ongoing cost for keeping
                    a website up and running, and as the site grows more popular these costs grow
                    larger, so your help in covering this would be appreciated. I want to keep this
                    website user friendly and informative by keeping the clutter and hassle out
                    (e.g. ads and paywalls) but the only way to sustain it is with your help.
                </p>
                <p>
                    If you like what you see and want more, let me know by buying me a smoothie :)
                </p>
                <StyledButtonWrapper>
                    <ButtonLink
                        href="https://www.buymeacoffee.com/healthfoods"
                        newTab={true}
                        image={{
                            src: supportIcon,
                            alt: 'But me a smoothie?',
                        }}
                        buttonText="Buy me a smoothie?"
                    />
                </StyledButtonWrapper>

                <p>
                    I know not everyone is in a position to give, so I would love your support in
                    the form of a message with feedback about this site and/or a recipe idea. You
                    can contact me <StyledAnchor to="/about/contact">here</StyledAnchor>.
                </p>
            </StyledContentBox>
        </React.Fragment>
    )
}

export default SupportPage
