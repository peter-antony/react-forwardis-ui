
import React from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { PageLayout } from '@/layouts/PageLayout';
import { SplitLayout } from '@/components/layouts/SplitLayout';
import OrderForm from '@/components/QuickOrderNew/OrderForm';
import NewResourceGroup from '@/components/QuickOrderNew/NewResourceGroup';
import { toast } from 'sonner';

const CreateQuickOrder = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard', active: false },
    { label: 'Quick Order Management', href: '/quick-order', active: false },
    { label: 'Create Quick Order', active: true }
  ];

  const handleSaveDraft = () => {
    toast.success('Order saved as draft successfully!');
    console.log('Save draft clicked');
  };

  const handleConfirm = () => {
    toast.success('Order confirmed successfully!');
    console.log('Confirm order clicked');
  };

  const handleCancel = () => {
    toast.info('Order creation cancelled');
    console.log('Cancel clicked');
  };

  const handleAddResource = () => {
    console.log('Add resource group clicked');
  };

  return (
    <MainLayout>
      <PageLayout
        breadcrumbs={breadcrumbItems}
        title="Create Quick Order"
      >
        <SplitLayout
          leftWidth="narrow"
          left={
            <OrderForm
              onSaveDraft={handleSaveDraft}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          }
          right={
            <NewResourceGroup onAddResource={handleAddResource} />
          }
        />
      </PageLayout>
    </MainLayout>
  );
};

export default CreateQuickOrder;
