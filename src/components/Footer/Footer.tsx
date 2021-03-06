import React from 'react'
import {
    StyledFooterItem,
    StyledFooterColumn,
    StyledFooterLogo,
    StyledFooter,
    StyledFooterParagraph,
} from './Footer.styled'

export class Footer extends React.Component {
    render() {
        return (
            <React.Fragment>
                <StyledFooter>
                    <StyledFooterColumn>
                        <StyledFooterLogo to={'/'}>Hayley's Health Foods</StyledFooterLogo>
                    </StyledFooterColumn>
                    <StyledFooterColumn>
                        <StyledFooterItem to={'/'}>Recipes</StyledFooterItem>
                        <StyledFooterItem to={'/about'}>About</StyledFooterItem>
                        <StyledFooterItem to={'/about/support'}>Support</StyledFooterItem>
                    </StyledFooterColumn>
                </StyledFooter>
                <StyledFooterParagraph>
                    Info Icon made by{' '}
                    <a
                        href="https://www.flaticon.com/authors/prettycons"
                        title="prettyicons"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        prettyicons
                    </a>
                    . Blog, Contact, Water Droplet and Chef Icons made by{' '}
                    <a
                        href="https://www.flaticon.com/authors/freepik"
                        title="Freepik"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Freepik
                    </a>
                    . Chopping Board Icon made by{' '}
                    <a
                        href="https://www.flaticon.com/authors/monkik"
                        title="monkik"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        monkik
                    </a>
                    . Plate Icon made by{' '}
                    <a
                        href="https://www.flaticon.com/authors/pause08"
                        title="Pause08"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Pause08
                    </a>
                    . Arrow Icon made by{' '}
                    <a
                        href="https://www.flaticon.com/authors/roundicons"
                        title="roundicons"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        roundicons
                    </a>
                    . Snowflake Icon made by{' '}
                    <a
                        href="https://www.flaticon.com/authors/kiranshastry"
                        title="kiranshastry"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        kiranshastry
                    </a>
                    . Water and Timer Icons made by{' '}
                    <a
                        href="https://www.flaticon.com/authors/good-ware"
                        title="Good Ware"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Good Ware
                    </a>
                    . These icons are from{' '}
                    <a
                        href="https://www.flaticon.com/"
                        title="Flaticon"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {' '}
                        www.flaticon.com
                    </a>
                </StyledFooterParagraph>
            </React.Fragment>
        )
    }
}
