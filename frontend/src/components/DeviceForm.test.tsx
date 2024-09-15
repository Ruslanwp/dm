import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DeviceForm } from "./DeviceForm";
import assert from "assert";
import { act } from "react";
import userEvent from "@testing-library/user-event";

describe("DeviceForm", () => {
  test("renders labels of each input of form with submit", () => {
    const mockOnSave = jest.fn();
    render(<DeviceForm onSave={mockOnSave} isLoading={true} />);

    assert.ok(screen.getByText("Owner Name"));
    assert.ok(screen.getByText("Device Name"));
    assert.ok(screen.getByText("Device Type"));
    assert.ok(screen.getByText("Battery status"));
    assert.ok(screen.getByText("Submit"));
  });

  test("renders form inputs with default initial fields", () => {
    const mockOnSave = jest.fn();
    render(<DeviceForm onSave={mockOnSave} isLoading={true} />);

    const ownerNameInput = screen.getByLabelText("Owner Name") as HTMLInputElement;
    const deviceNameInput = screen.getByLabelText("Device Name") as HTMLInputElement;
    const batteryStatusInput = screen.getByLabelText("Battery status") as HTMLInputElement;

    const deviceTypeTitle = screen.getByText("Tablet");

    expect(ownerNameInput.value).toBe("");
    expect(deviceNameInput.value).toBe("");
    expect(deviceTypeTitle.innerHTML).toBe("Tablet");
    expect(batteryStatusInput.value).toBe("100");
  });

  test("renders form inputs with initial fields based on passed initialFormState", () => {
    const mockOnSave = jest.fn();
    render(
      <DeviceForm
        onSave={mockOnSave}
        isLoading={true}
        initialFormState={{
          id: 1,
          deviceName: "My device",
          batteryStatus: 100,
          deviceType: "Smartphone",
          ownerName: "Ruslan",
        }}
      />
    );

    const ownerNameInput = screen.getByLabelText("Owner Name") as HTMLInputElement;
    const deviceNameInput = screen.getByLabelText("Device Name") as HTMLInputElement;
    const deviceTypeTitle = screen.getByText("Smartphone");
    const batteryStatusInput = screen.getByLabelText("Battery status") as HTMLInputElement;

    expect(ownerNameInput.value).toBe("Ruslan");
    expect(deviceNameInput.value).toBe("My device");
    expect(deviceTypeTitle.innerHTML).toBe("Smartphone");
    expect(batteryStatusInput.value).toBe("100");
  });

  test("renders button as disabled when loading is true", () => {
    const mockOnSave = jest.fn();
    render(<DeviceForm onSave={mockOnSave} isLoading={true} />);

    const submitButton = screen.getByTestId('Submit button') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(true);
  });

  test("renders button as enabled when loading is false", () => {
    const mockOnSave = jest.fn();
    render(<DeviceForm onSave={mockOnSave} isLoading={false} />);

    const submitButton = screen.getByTestId('Submit button') as HTMLButtonElement;

    expect(submitButton.disabled).toBe(false);
  });

  test("calls onSave with form state when submit button is clicked and isLoading is false", async () => {
    const mockOnSave = jest.fn();
    render(<DeviceForm onSave={mockOnSave} isLoading={false} />);

    const submitButton = screen.getByText("Submit");

    await act(async() => {
      userEvent.click(submitButton)
    });

    waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledTimes(1);
      expect(mockOnSave).toHaveBeenCalledWith({
        deviceName: "",
        batteryStatus: 100,
        deviceType: "Tablet",
        ownerName: "",
      });
    });
  });

  test("does not call onSave when submit button is disabled, isLoading is true", async () => {
    const mockOnSave = jest.fn();
    render(<DeviceForm onSave={mockOnSave} isLoading={true} />);

    const submitButton = screen.getByText("Submit");

    try {
      await act(async () => {
        userEvent.click(submitButton);
      });
    } catch (error) {}

    waitFor(() => {
      expect(mockOnSave).not.toHaveBeenCalled();
    });
  });

  test("sets values to the form fields and checks if they are set", async () => {
    const mockOnSave = jest.fn();
    render(<DeviceForm onSave={mockOnSave} isLoading={false} />);

    const ownerNameInput = screen.getByLabelText("Owner Name") as HTMLInputElement;
    const deviceNameInput = screen.getByLabelText("Device Name") as HTMLInputElement;
    const batteryStatusInput = screen.getByLabelText("Battery status") as HTMLInputElement;
    const deviceTypeSelect = screen.getByLabelText("Device Type") as HTMLSelectElement;

    await act(async () => {
      fireEvent.change(ownerNameInput, { target: { value: "Ruslan" } });
      fireEvent.change(deviceNameInput, { target: { value: "My device" } });
      fireEvent.change(batteryStatusInput, { target: { value: 50 } });
      fireEvent.change(deviceTypeSelect, { target: { value: "Smartphone" } });
    });

    waitFor(() => {
      expect(ownerNameInput.value).toBe("Ruslan");
      expect(deviceNameInput.value).toBe("My device");
      expect(batteryStatusInput.value).toBe("50");
      expect(deviceTypeSelect.value).toBe("Smartphone");
    });
  });
});
