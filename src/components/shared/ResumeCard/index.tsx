import { Divider, Card } from '@mui/material'
import { ResumeCardContainer } from './styles'

import { ReactNode } from 'react';
import { SeeMoreButton } from '../SeeMoreButton';
import { EmptyDashboardCard, EmptyDashboardCardProps } from '../../dashboard/EmptyDashboardCard';

interface ResumeCardProps extends EmptyDashboardCardProps {
  emptyCard?: boolean;
  cardContent: ReactNode;
  cardTitle: string;
}

export function ResumeCard({ icon, title, subtitle, emptyCard, cardContent, cardTitle }: ResumeCardProps) {
  return (
    <ResumeCardContainer>
      <p>{cardTitle}</p>
      <Card>
        {emptyCard ? (<EmptyDashboardCard icon={icon} title={title} subtitle={subtitle} />) : cardContent}
        <Divider />
        <SeeMoreButton text="see more" />
      </Card>
    </ResumeCardContainer>
  )
}
