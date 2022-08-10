import { FormattedMessage, useIntl } from 'react-intl';
import { Elements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { stripePromise } from '../../../shared/services/stripe';
import { StripePaymentForm } from '../../../shared/components/finances/stripe';
import { useSnackbar } from '../../../shared/components/snackbar';
import { Routes } from '../../../app/config/routes';
import { useGenerateLocalePath } from '../../../shared/hooks/localePaths';
import { Container, Header, Subheader } from './paymentConfirm.styles';

export const PaymentConfirm = () => {
  const intl = useIntl();
  const { showMessage } = useSnackbar();
  const navigate = useNavigate();
  const generateLocalePath = useGenerateLocalePath();

  const successMessage = intl.formatMessage({
    defaultMessage: 'Payment successful',
    description: 'Stripe payment / payment successful',
  });

  return (
    <Container>
      <Header>
        <FormattedMessage defaultMessage="Payments" description="Finances / Stripe / Payment confirm / heading" />
      </Header>

      <Subheader>
        <FormattedMessage defaultMessage="Donate" description="Finances / Stripe / Payment confirm / subheading" />
      </Subheader>

      <Elements stripe={stripePromise}>
        <StripePaymentForm
          onSuccess={() => {
            navigate(generateLocalePath(Routes.home));
            showMessage(successMessage);
          }}
        />
      </Elements>
    </Container>
  );
};
