import React, { useState } from 'react';
import { DynamicPanel } from '@/components/DynamicPanel';
import { PanelVisibilityManager } from '@/components/DynamicPanel/PanelVisibilityManager';
import { PanelConfig, PanelSettings } from '@/types/dynamicPanel';
import { EyeOff } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AppLayout } from '@/components/AppLayout';
import OrderForm from '@/components/QuickOrderNew/OrderForm';
import NewResourceGroup from '@/components/QuickOrderNew/NewResourceGroup';
import { toast } from 'sonner';


const NewCreateQuickOrder = () => {
    
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
    // toast.success('Resource group functionality will be implemented next!');
    console.log('Add resource group clicked');
  };

  return (
    <div className="flex gap-6">
        {/* Left Column - Order Form */}
        <div className="lg:col-span-1 w-2/5">
        <OrderForm
            onSaveDraft={handleSaveDraft}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
        />
        </div>
        
        {/* Right Column - Resource Group Panel */}
        <div className="lg:col-span-1 w-3/5">
        <NewResourceGroup onAddResource={handleAddResource} />
        </div>
    </div>
  );
};

export default NewCreateQuickOrder;
