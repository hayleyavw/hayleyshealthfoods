import styled from '@emotion/styled'
import { colours } from '../styling/colours'
import { calcRem } from '../styling/styling-utils/calc-rem'

export const StyledRecipeStepCard = styled('div')({
    backgroundColor: colours.white,

    h4: {
        marginTop: calcRem(10),
    },
})
