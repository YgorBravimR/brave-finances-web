import { Button } from "@mui/material";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Bank, Coin, Money, Plus } from "phosphor-react";
import { useContext, useState } from "react";

import { accountsApiResponse } from "../api/accountsAPI";
import { AccountCard } from "../components/account/AccountCard";
import { BalanceCard } from "../components/shared/BalanceCard";
import { BaseModal } from "../components/shared/Modals/BaseModal";
import { NewAccountForm } from "../components/shared/Modals/Forms/NewAccountModal";
import { AccountsContext } from "../contexts/AccountsContext";
import { getAPIClient } from "../services/axios";
import { AccountsCardsContainer, AccountsPageBody, AccountsPageContainer, AccountsPageHeader, BalancesContainer } from '../styles/pages/accounts'

export default function Accounts() {
  const { setAccount, openNewAccountModal, setOpenNewAccountModal, handleCloseNewAccountModal } = useContext(AccountsContext)
  const [accountsArray, setAccountsArray] = useState(accountsApiResponse.data)

  function openModalSetAccount() {
    setAccount("conta2")
    setOpenNewAccountModal(true)
  }

  return (
    <AccountsPageContainer>
      <AccountsPageHeader>
        <h2>Accounts</h2>
        <Button onClick={openModalSetAccount}>
          <Plus weight="bold" />
        </Button>
        <BaseModal openModal={openNewAccountModal} closeModal={handleCloseNewAccountModal}>
          <NewAccountForm />
        </BaseModal>
      </AccountsPageHeader>

      <AccountsPageBody>
        <AccountsCardsContainer>
          {accountsArray.per_account.map((account, i) => (
            <AccountCard key={i} account_name={account.account_name} balance={account.current_balance} icon={<Bank size={32} />} predicted_balance={account.predicted_balance} onClick={openModalSetAccount} />
          ))}
        </AccountsCardsContainer>

        <BalancesContainer>
          <BalanceCard icon={<Money size={32} />} iconColor='#2296f3' title='Current Balance' value={accountsArray.current_balance} to={'/dashboard'} />
          <BalanceCard icon={<Coin size={32} />} iconColor='#6514dd' title='Predicted Balance' value={accountsArray.predicted_valance} to={'/dashboard'} />
        </BalancesContainer>
      </AccountsPageBody>
    </AccountsPageContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx)
  const { '@MyBills:token': token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  await apiClient.get('/users')

  return {
    props: {}
  }
}




